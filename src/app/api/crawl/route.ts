import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import https from 'https';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';

    try {
        // BizInfo Support Project List URL
        const url = `https://www.bizinfo.go.kr/web/lay1/bbs/S1T122C128/AS/74/list.do`;

        // Create an agent to handle potential SSL issues or generic headers
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        const { data } = await axios.get(url, {
            httpsAgent: agent,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            // BizInfo might filter search results via form data or query params. 
            // For now, we scrape the latest list. If 'query' is present, we filter *after* scraping.
            params: {
                rows: 15, // Get 15 items
                cpage: 1  // Page 1
            }
        });

        const $ = cheerio.load(data);
        const results: { title: string; link: string; desc: string; date: string; status: string }[] = [];

        // Parsing logic based on common board structure and observation
        // We look for 'a' tags with href containing 'view.do'
        $('a[href*="view.do?pblancId="]').each((_, element) => {
            const linkNode = $(element);
            const title = linkNode.text().trim();
            const href = linkNode.attr('href') || '#';
            const fullLink = href.startsWith('http') ? href : `https://www.bizinfo.go.kr${href}`;

            // Try to find status (e.g., '접수중', '마감') likely in a sibling or child badge
            // Often inside the link or strict table structure. 
            // We'll attempt to find reasonable metadata.

            // In many board lists:
            // <tr>
            //   <td>No</td>
            //   <td>Status (Span)</td>
            //   <td class="subject"><a ...>Title</a></td>
            //   <td>Dept</td>
            //   <td>Date</td>
            // </tr>

            // Let's try to get the row keys if possible.
            const row = linkNode.closest('tr');
            let date = '';
            let status = '접수중'; // Default
            let dept = '';

            if (row.length > 0) {
                // Assuming standard N-th child structure for Gov boards
                // This is a guess but robust enough for a "similar" look.
                // We will refine if we see the column indices.
                // Usually: No, Status, Title, Dept, Date, Hits
                status = row.find('td').eq(1).text().trim() || '접수중';
                dept = row.find('td').eq(3).text().trim() || '소관부처';
                date = row.find('td').eq(4).text().trim() || '2025-01-01'; // Fallback
            } else {
                // If not table, maybe list view?
                date = new Date().toISOString().split('T')[0]; // Fallback to today
            }

            // Filter by query if provided
            if (query && !title.includes(query)) {
                return;
            }

            if (title) {
                results.push({
                    title,
                    link: fullLink,
                    desc: dept ? `${dept} | ${status}` : "기업마당 정책 정보",
                    date,
                    status
                });
            }
        });

        return NextResponse.json({ success: true, data: results });
    } catch (error) {
        console.error('Crawling Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch data',
            data: []
        }, { status: 500 });
    }
}
