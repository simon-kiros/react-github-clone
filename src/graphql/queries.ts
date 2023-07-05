import { gql } from "@apollo/client";

export const GET_REPO_INFO = gql`
  query GetRepo($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      forkCount
      description
      stargazerCount
      watchers {
        totalCount
      }
      branches: refs(refPrefix: "refs/heads/") {
        totalCount
      }
      tags: refs(refPrefix: "refs/tags/") {
        totalCount
      }
      owner {
        __typename
      }
      defaultBranchRef {
        name
        target {
          ... on Commit {
            history(first: 1) {
              totalCount
              nodes {
                committedDate
                messageHeadline
                oid
                author {
                  avatarUrl
                  user {
                    login
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ORG_PROFILE = gql`
  query getOrg($name: String!) {
    user: organization(login: $name) {
      name
      avatarUrl
      description
      location
      websiteUrl
      isVerified
      twitterUsername
      repositories(first: 10, orderBy: { field: STARGAZERS, direction: DESC }) {
        nodes {
          nameWithOwner
          description
          forkCount
          updatedAt
          pullRequests {
            totalCount
          }
          issues {
            totalCount
          }
          stargazers {
            totalCount
          }
          owner {
            __typename
          }
          primaryLanguage {
            name
          }
          languages(first: 5) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query getUser($name: String!) {
    user(login: $name) {
      name
      avatarUrl
      description: bio
      location
      websiteUrl
      twitterUsername
      followers {
        totalCount
      }
      repositories(first: 10, orderBy: { field: STARGAZERS, direction: DESC }) {
        nodes {
          nameWithOwner
          description
          forkCount
          updatedAt
          pullRequests {
            totalCount
          }
          issues {
            totalCount
          }
          stargazers {
            totalCount
          }
          owner {
            __typename
          }
          primaryLanguage {
            name
          }
          languages(first: 5) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_REPO_ENTRIES = gql`
  query getEntry(
    $owner: String!
    $name: String!
    $branch: String!
    $readme: String!
  ) {
    repository(owner: $owner, name: $name) {
      id
      object(expression: $branch) {
        ... on Tree {
          entries {
            name
            type
          }
        }
      }
      readme: object(expression: $readme) {
        ... on Blob {
          text
        }
      }
    }
  }
`;

export const GET_REPO_COMMITS = gql`
  query getCommit(
    $owner: String!
    $name: String!
    $branch: String!
    $first: Int!
  ) {
    repository(owner: $owner, name: $name) {
      ref(qualifiedName: $branch) {
        target {
          ... on Commit {
            history(first: $first) {
              edges {
                node {
                  messageHeadline
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_SOURCE_CODE = gql`
  query getSourceCode($owner: String!, $name: String!, $branch: String!) {
    repository(owner: $owner, name: $name) {
      id
      object(expression: $branch) {
        ... on Blob {
          byteSize
          text
        }
      }
    }
  }
`;

export const GET_REPO_ISSUES = gql`
  query getIssues($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      issues(
        first: 10
        states: OPEN
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        edges {
          node {
            title
            createdAt
            number
            author {
              login
            }
            comments {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export const GET_REPO_PRS = gql`
  query getPRS($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      pullRequests(
        first: 10
        states: OPEN
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        edges {
          node {
            title
            createdAt
            number
            author {
              login
            }
            comments {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_REPOS = gql`
  query searchRepos($query: String!) {
    search(query: $query, type: REPOSITORY, first: 10) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            url
            description
            owner {
              __typename
            }
            repositoryTopics(first: 12) {
              nodes {
                topic {
                  name
                }
              }
            }
            primaryLanguage {
              name
            }
            languages(first: 3) {
              nodes {
                name
              }
            }
            releases {
              totalCount
            }
            forkCount

            stargazers {
              totalCount
            }
            pullRequests {
              totalCount
            }
            issues {
              totalCount
            }
            createdAt
            pushedAt
            updatedAt
            nameWithOwner
          }
        }
      }
    }
  }
`;

export const GET_README_FILE = gql`
  query getReadme {
    repository(owner: "facebook", name: "react") {
      object(expression: "main:packages/react/src/ReactCreateRef.js") {
        ... on Blob {
          text
        }
      }
    }
  }
`;
