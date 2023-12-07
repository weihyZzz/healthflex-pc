import { gql } from '@apollo/client';

export const GET_COURSES = gql`
query getCourses($page: PageInput!, $name: String) {
    getCourses(page: $page, name: $name){
      code
      message
      page {
        total
        pageNum
        pageSize
      }
      data {
        id
        name
        limitNumber
        duration
      }
    }
  }
`;
export const COMMIT_COURSE = gql`
  mutation commitCourseInfo($params: CourseInput!, $id: String) {
    commitCourseInfo(params: $params, id: $id) {
      code
      message
    }
  }
`;
