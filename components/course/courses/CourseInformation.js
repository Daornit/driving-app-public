import PropTypes from 'prop-types';
import withData from "../../../apollo/apollo.js";

import { useQuery } from '@apollo/react-hooks';
import { COURSES_QUERY } from "apollo/queries";


const CourseInformation = (props) => {
    console.log(data);
    const { loading, error, data, fetchMore } = useQuery(COURSES_QUERY);
    if(loading) return 'loading';
    if(error) return error.message;

    console.log('data:: ', data.users);
    return (
        <>
            <div className="container" style={props.timeout ? {display: 'none'} : {}}>
            {
                    data.courses.map(course => 
                        <div key={course._id} className="courseContent">
                            <span className="image main"><img src="/static/images/batkhuleg.png" alt="" width="500"/></span>
                            <h3>{course.name}</h3>
                            <button><a href="javascript:;" onClick={() => {props.onOpenArticle('bat')}}>Дэлгэрэнгүй</a></button>
                        </div>
                    )
                }
            </div>
            <style jsx>{`
            `}</style>
        </>
    )
}


CourseInformation.propTypes = {
    onOpenArticle: PropTypes.func,
    timeout: PropTypes.bool
}

export default withData(CourseInformation);
