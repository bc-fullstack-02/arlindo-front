import { UserCircle, Chat, Heart, IconWeight } from 'phosphor-react'
import Heading from "../Heading";
import Text from "../Text";
import { Post, Comment } from '../../models/Post';
import { UserInfo } from '../../models/UserInfo';
import * as Dialog from '@radix-ui/react-dialog';
import CreateCommentDialog from '../CreateCommentDialog';
import { useState } from 'react';
import CommentsList from '../CommentList';
export interface FeedProps {
    posts: Post[];
    handleLike: (post: Post) => void;
    loggedUser: UserInfo;
}

function Feed({ posts, handleLike, loggedUser }: FeedProps) {

    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);

    function closeDialog(newComment: Comment) {
        setOpen(false);
        // setComments((comments: any) => [newComment, ...comments]);
    }

    function openDialog(post: any) {
        localStorage.setItem('id_post', post._id);
        setOpen(true);
    }


    function getColor(post: Post) {
        const userHaveLike = post.likes.find(like => like.user == loggedUser._id);

        return userHaveLike != null
            ? "red"
            : "white";
    }

    function getWeight(post: Post): IconWeight {
        const userHaveLike = post.likes.find(like => like.user == loggedUser._id);

        return userHaveLike != null
            ? "fill"
            : "regular";
    }

    return (
        <div>
            <Heading className="border-b border-slate-400 mt-4">
                <Text size="lg" className="font-extrabold ml-5">
                    Página Inicial
                </Text>
            </Heading>

            <section>
                {posts &&
                    posts.map((post: Post) => (
                        <div className="border-b border-slate-400" key={post._id}>
                            <div className="flex flex-row items-center ml-5 my-4">
                                <UserCircle size={48} weight="light" className='text-slate-50'></UserCircle>
                                <Text className="font-extrabold ml-2">{post.user?.name}</Text>
                            </div>
                            <div className='ml-16 flex flex-col gap-2' >
                                <Heading size="sm">{post.title}</Heading>
                                <Text>
                                    <p>{post.description}</p>
                                </Text>
                                <div>
                                    <img src={post.img} />
                                </div>
                            </div>
                            <div className="flex items-center ml-16 my-14 space-x-2">
                                <Chat size={24} className='text-slate-50' onClick={() => openDialog(post)} />
                                <Text size="sm">{post.comments.length}</Text>
                                <div className="flex flex-col items-center ml-4">
                                    <Dialog.Root open={open} onOpenChange={setOpen}>
                                        <CreateCommentDialog closeDialog={closeDialog} />
                                    </Dialog.Root>
                                </div>
                                <div className='cursor-pointer hover:bg-sky-400 rounded-full p-1' onClick={() => handleLike(post)}>
                                    <Heart size={24} color={getColor(post)} weight={getWeight(post)} className='text-slate-50' />
                                </div>
                                <Text size="sm">{post.likes.length}</Text>
                            </div>
                            { post.comments.length > 0 && post.comments.map(comment => ( <CommentsList post={comment} />))}
                        </div>
                    ))}
            </section>
        </div>
    );
}

export default Feed;