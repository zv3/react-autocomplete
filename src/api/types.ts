export interface GithubTopic {
  name: string,
  display_name: string | null,
}

export interface SearchTopicsResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubTopic[];
}

export interface GithubAPI {
  searchTopics: (query: string) => Promise<GithubTopic[]>
}
