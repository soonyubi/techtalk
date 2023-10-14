import axios from 'axios';
import * as cheerio from 'cheerio';
import * as console from 'console';
import { CrawlingDataInterface } from '../../interfaces/crawling.interface';
import { CrawlingStrategy } from './crawling.strategy.interface';

export class GangnamUnniCrawlingStrategy implements CrawlingStrategy {
  async crawl(domain: string, path: string): Promise<CrawlingDataInterface[]> {
    const result: CrawlingDataInterface[] = [];

    try {
      const response = await axios.get(domain + path);
      const $ = cheerio.load(response.data);

      const elements = $('#content > div > div > ul > li').toArray();

      const promises = elements.map(async (element) => {
        const pubDateElement = $(element).find(
          'div.post-info > div.post-title > a',
        );
        const hrefValue = pubDateElement.attr('href');
        const pubDate = await this.fetchPublishDate(domain, hrefValue);

        const title = $(element)
          .find('div.post-info > div.post-title > a')
          .text()
          .trim();
        const description = $(element)
          .find('div.post-info > div.post-description > a')
          .text()
          .trim();
        const category = $(element)
          .find('div.post-info > div.post-category.gilroy')
          .text()
          .trim();
        const tags: string[] = [];

        $(element)
          .find('div.post-info > div.post-tag-wrap > span')
          .each((_, tagElement) => {
            tags.push($(tagElement).text().trim());
          });

        return {
          title,
          description,
          categories: [category],
          tags,
          publishDate: new Date(pubDate),
        };
      });

      const resolvedData = await Promise.all(promises);
      result.push(...resolvedData);
    } catch (error) {
      console.log(error);
    }

    return result;
  }

  private async fetchPublishDate(domain: string, href: string) {
    const detailPostResponse = await axios.get(domain + href);

    const pubDateCheerio = cheerio.load(detailPostResponse.data);
    return pubDateCheerio(
      '#content > article > div.post-info > div > div.post-date',
    )
      .text()
      .trim();
  }
}
