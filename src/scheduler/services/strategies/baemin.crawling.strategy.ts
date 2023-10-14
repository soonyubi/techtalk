import axios from 'axios';
import { CrawlingStrategy } from './crawling.strategy.interface';

export class BaeminCrawlingStrategy implements CrawlingStrategy {
  async crawl(domain: string, path: string): Promise<void> {
    const url = 'https://techblog.woowahan.com/wp-admin/admin-ajax.php';

    // POST 요청에 필요한 파라미터 설정
    const params = new URLSearchParams();
    params.append('action', 'get_posts_data');
    params.append('data[post][post_type]', 'post');
    params.append('data[post][paged]', '3');
    params.append('data[meta]', 'main');

    try {
      const response = await axios.post(url, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // 이 부분에서 response.data 를 파싱하면 돼
      console.log(response.data.data.posts);
    } catch (error) {
      console.error(`Error fetching baemin data: ${error}`);
    }
  }
}

const aa = new BaeminCrawlingStrategy();
aa.crawl('', '');
