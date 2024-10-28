import styles from './Post.module.css';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface postProps {
    author: {
        avatarURL: string,
        name: string,
        role: string
    }, 
    content: {
            type: string,
            line: number,
            content: string
        }[], 
    publishedAt: Date,
    loggedUser: {
        name: string;
        role: string;
        img: string;
    }
}

export function Post({author, content, publishedAt, loggedUser}: postProps){
    
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {locale: ptBR})
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {locale: ptBR, addSuffix: true})
    
    const [comments, setComments] = useState([
        {   
            name: 'Anonymous',
            text: 'Post muito legal!',
            img: '',
            commentPublishedAt: new Date
        },
        {
            name: 'Anonymous',
            text: 'Maneiro demais!',
            img: '',
            commentPublishedAt: new Date
        }        
    ])

    const [text, setText] = useState('')
    
    
    function handleCreateNewComment(event: FormEvent){
        event.preventDefault();

        setComments([...comments, {
            name: loggedUser.name,
            text: text,
            img: loggedUser.img,
            commentPublishedAt: new Date
        }])

        setText('');
    }

    function handleChangeFormText(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('O comentário precisa ter um conteúdo.')
    }

    function deleteComment(comment: string){
        setComments(prevComments => prevComments.filter(item => item.text != comment))        
    }

    const isNewCommentEmpty = text.length == 0


    return(
        <article className={styles.post}>
            <header className={styles.header}>
                <div className={styles.author}>
                    <Avatar src={author.avatarURL} />
                    <div className={styles.authorInfo}>
                        <b>{author.name}</b>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <main className={styles.content}>
                {content.map(e => (
                    e.type == 'link' ? <p key={e.line}><a href={e.content}>{e.content}</a></p> : <p key={e.line}>{e.content}</p>
                ))}
            </main>

            <form onSubmit={handleCreateNewComment} className={styles.comments}>
                <b>Deixe seu comentário</b>
                <textarea onChange={handleChangeFormText} 
                          value={text}
                          className={styles.textArea} 
                          placeholder='Deixe um Comentário...'
                          onInvalid={handleNewCommentInvalid}
                          required={true}>
                </textarea>
                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => (
                    <Comment key={comment.text} content={comment} onDeleteComment={deleteComment} />
                    ))}
            </div>
        </article>
    )}