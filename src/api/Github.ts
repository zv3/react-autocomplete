import { GithubAPI, GithubTopic, SearchTopicsResponse } from './types';

const SEARCH_API_URL = 'https://api.github.com/search/topics';

const API: GithubAPI = {
  /**
   * Search for Github topics.
   * https://docs.github.com/en/rest/search#search-topics
   *
   * @param {String} query
   * @return {Promise<GithubTopic[]>}
   */
  async searchTopics(query: string): Promise<GithubTopic[]> {
    const params = new URLSearchParams();
    params.set('q', query);
    params.set('per_page', '10');

    const { REACT_APP_GITHUB_OAUTH_TOKEN: apiToken } = process.env;

    const response = await fetch(`${SEARCH_API_URL}?${params}`, {
      method: 'GET',
      headers: {
        ...(apiToken && { Authorization: `token ${apiToken}` }), // Optional, grants higher limits
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const { items }: SearchTopicsResponse = await response.json();

    return items;
  },
};

export default API;
