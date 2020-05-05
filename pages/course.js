import Head from "next/head"
import stylesheet from 'styles/course/main.scss'
import axios from 'axios';

import Header from "../components/course/Header"
import CourseInformation from "../components/course/courses/CourseInformation"
import Main from "../components/course/Main"


function CoursePage(props) {

    const [state, setState] = React.useState({
        isArticleVisible: false,
        timeout: false,
        articleTimeout: false,
        article: "",
        loading: "is-loading",
        courses: []
    });

    React.useEffect(()=>{
      setTimeout(() => {
        setState({ loading: "" })
      }, 100)

      axios.post('https://driving-app-graphql.herokuapp.com/graphql', {"operationName":"courses","variables":{},"query":"query courses {\n  courses {\n    _id\n    name\n    description\n    image\n  }\n}\n"})
      .then(res=>setState({courses: res.data.data.courses}));
    }, []);

    const handleOpenArticle = (article) => {
        setState({
            isArticleVisible: !state.isArticleVisible,
            article
        })

        setTimeout(() => {
            setState({
                timeout: !state.timeout
            })
        }, 325)

        setTimeout(() => {
            setState({
                articleTimeout: !state.articleTimeout
            })
        }, 350)
    }

    const handleCloseArticle = () => {
        setState({
            articleTimeout: !state.articleTimeout
        })

        setTimeout(() => {
            setState({
                timeout: !state.timeout
            })
        }, 325)

        setTimeout(() => {
            setState({
                isArticleVisible: !state.isArticleVisible,
                article: ""
            })
        }, 350)
    }

    return (
      <div className={`body ${state.loading} ${state.isArticleVisible ? "is-article-visible" : ""}`}>
          <div>
              <Head>
                  <title>Driving app</title>
                  {/* <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,600,600i" rel="stylesheet" /> */}
              </Head>

              <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
              <Header onOpenArticle={handleOpenArticle} timeout={state.timeout} />
              <CourseInformation courses={state.courses} onOpenArticle={handleOpenArticle} timeout={state.timeout} />
              <div id="wrapper">
                  
                  <Main
                      courses={state.courses} 
                      isArticleVisible={state.isArticleVisible}
                      timeout={state.timeout}
                      articleTimeout={state.articleTimeout}
                      article={state.article}
                      onCloseArticle={handleCloseArticle}
                  />

              </div>
              <div>
                  
              </div>

              <div id="bg" />
          </div>
      </div>
  )
}

export default CoursePage;
