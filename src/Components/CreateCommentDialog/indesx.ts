import * as Dialog from '@radix-ui/react-dialog';
import api from '../../services/api';
import { FormEvent } from "react";
import Button from '../../Components/Button';
import { TextInput } from '../../Components/TextInput';
import { Comment } from '../../models/Post';

interface CreateCommentDialogProps {
    closeDialog: (newComment: Comment) => void;
}

interface CommentFormElements extends HTMLFormControlsCollection {
    description: HTMLInputElement;
}

interface CommentFormElements extends HTMLFormElement {
    readonly elements: CommentFormElements;
}

function CreateCommentDialog ({ closeDialog }: CreateCommentDialogProps) {
    const token = localStorage.getItem("accessToken");

    async function handleSubmit(event: FormEvent<CommentFormElements>) {
       event.preventDefault();
       const form = event.currentTarget;

       const newComment = { comment: form.elements.description.value! }
       
       try {
            const idPost = localStorage.getItem('id_post');

            const response = await api.post(`/${ idPost }/comments`, newComment, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        
            closeDialog(response.data);
            localStorage.removeItem('id_post');

       } catch (err) {
        console.error(err);
        alert("Erro ao criar o Comentário");
       }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/20 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                <Dialog.Title className="text-2xl font-black">Novo Comentário</Dialog.Title>
                <form className="mt-8 flex flex-col gap-2" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="title" className="font-semibold">
                            Comentário
                        </label>
                        <TextInput.Input
                            id="description"
                            placeholder="Diga ai o seu cometário sobre o post :D"
                        />
                    </div>

                    <footer className='mt-6 flex justify-end gap-4 '>
                        <Dialog.Close
                            type="button"
                            className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                        >
                            Fechar
                        </Dialog.Close>
                        <Button type="submit" className="flex-none w-48">
                            Comentar!
                        </Button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    );
}

export default CreateCommentDialog;