import { ThumbsUp, Trash } from "phosphor-react";
import { Avatar } from './Avatar'
import { useState } from "react";
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR'
import styles from "./Comment.module.css";

interface commentProps {
    content: {
        name: string;
        text: string;
        img: string;
        commentPublishedAt: Date;
    },
    onDeleteComment: (comment: string) => void
}

export function Comment({content, onDeleteComment}: commentProps) {

    const publishedAt = content.commentPublishedAt
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {locale: ptBR})
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {locale: ptBR, addSuffix: true})

    const [likes, setLikes] = useState(0)
    
    function handleDeleteComment() {
        onDeleteComment(content.text)
    }
    
    function addLikes(){
        setLikes(likes + 1)
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src={content.img != ''? content.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}/>
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <b>{content.name}</b>
                            <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                                {publishedDateRelativeToNow}
                            </time>
                        </div>
                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash size={24} />
                        </button>
                    </header>
                    <p>
                        {content.text}
                    </p>
                </div>
                <footer>
                    <button onClick={addLikes}>
                        <ThumbsUp /> Aplaudir <span>{likes}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}