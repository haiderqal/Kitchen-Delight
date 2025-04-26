import moment from 'moment';
import { Link } from 'react-router-dom';

const Card = ({postData, updateUpvotes}) => {

    const increaseUpvotes = () => {
        updateUpvotes(postData);
    }

    const timeSincePost = moment.utc(postData.created_at).local().startOf('seconds').fromNow()

    return (
        <div className='post'>
            <div className='upvote_column'>
                <button className='upvote_button' onClick={increaseUpvotes}>
                    <img className='upvote_img' src="src/assets/food_upvote.png" />
                </button>
                <h5 className='upvote_num'>{postData.upvotes}</h5>
            </div>
            <Link to={'/postDetails/' + postData.id}>
                <div className='post_data'>
                    <h4>Created {timeSincePost}</h4>
                    <p className='post_title'>{postData.title}</p>
                    {}
                </div>
            </Link>
            
        </div>
    )
}

export default Card;