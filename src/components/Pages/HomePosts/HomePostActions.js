// PostCard üzerinden yapılan aksiyonlar
// Bazıları DetailPostCard'da da kullanılmakta
export function LikePost(postsState, setpostsState, postid) {
  // contextdeki statik post dizi verisi üzerinden değişiklikler yapılıyor


  const editedList = postsState.posts.map((p) => {
    
    if (postid === p.id) {
    
      return { ...p, isLiked: !p.isLiked };
    }
    return p;
  });

  setpostsState({...postsState,posts:editedList});
 
}
