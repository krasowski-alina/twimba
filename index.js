import { tweetsData } from "/data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


document.addEventListener("click", (e)=> {
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }
    else if (e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if (e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target.id === "tweet-btn"){
        handleTweetClick()
        
    }
})

function handleLikeClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
            return tweetId === tweet.uuid
})[0]
    
    if(targetTweetObj.isLiked){
        targetTweetObj.likes--   
    } else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter((tweet)=> {
        return tweet.uuid === tweetId
    })[0]
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets --
    }
    else {
        targetTweetObj.retweets ++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
    console.log( document.getElementById(`replies-${replyId}`))
}

function handleTweetClick(){
    const tweetInput = document.getElementById('tweet-input')
    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: `${tweetInput.value}`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: `${uuidv4()}`,
    })
    tweetInput.value = ``
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Your tweet is empty! Write something! ',
            })
    }
    render()
}

function getFeedHtml(){
    let feedHtml = ``

    tweetsData.forEach((tweet) => {
        let likedIconClass = ``
        let retweetIconClass = ``

        let repliesHtml = ``
        if(tweet.replies.length > 0){
            for (let reply of tweet.replies){
                repliesHtml += `  
                <div class="tweet-reply"> 
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                    </div>`
            }
        }
        feedHtml += `<div class="tweet">
        <div class="tweet-inner">
            <img src="${tweet.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                        <i class="fa-regular fa-comment-dots" 
                        data-reply=${tweet.uuid}></i>
                        ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-heart 
                        ${tweet.isLiked? likedIconClass = 'liked' : likedIconClass = '#999'}" 
                        data-like=${tweet.uuid}></i>
                        ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-retweet 
                        ${tweet.isRetweeted? retweetIconClass = 'retweeted' : retweetIconClass = '#999'}" 
                        data-retweet=${tweet.uuid}></i>
                        ${tweet.retweets}
                    </span>
                </div>   
            </div>            
        </div>
    </div>
    <div class="hidden" id ="replies-${tweet.uuid}">
        ${repliesHtml}
    </div> 
`
})
    return feedHtml
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}
render()