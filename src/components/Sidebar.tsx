import { PencilLine } from 'phosphor-react';
import styles from './Sidebar.module.css';
import { Avatar } from './Avatar';

interface loggedUserType {
    loggedUser: {
        name: string;
        role: string;
        img: string;
    }
}

export function Sidebar({ loggedUser }:loggedUserType){

    return(
        <aside className={styles.sidebar}>
            <img className={styles.cover} src="https://images.unsplash.com/photo-1516886635086-2b3c423c0947?q=50&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <div className={styles.profile}>
                <Avatar src={loggedUser.img}/>
                <b>{loggedUser.name}</b>
                <span>{loggedUser.role}</span>
            </div>
            <footer>
                <a href="#">
                    <PencilLine size={20} />
                    Editar seu perfil
                </a>
            </footer>
        </aside>   
    )
}