import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import {Post} from './components/Post';
import { Sidebar } from './components/Sidebar';
import styles from './App.module.css'
import './global.css';

const loggedUserInfo = {
  name: 'Caio Galdino',
  role: 'Developer',
  img: 'http://github.com/galdcvn.png'
}

export function App() {

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        avatarURL: 'http://github.com/galdcvn.png',
        name: 'Caio Galdino',
        role: 'Front-end Developer'
      },
      content: [
        {
          type: 'paragraph',
          line: 1,
          content: 'Eaee, Pessoal'
        },
        {
          type: 'paragraph',
          line: 2,
          content: 'Passando aqui só pra mostrar meu novo app do Rocketseat Ignite, o Ignite Feed.',
        },
        {
          type: 'paragraph',
          line: 3,
          content: 'O repo vai estar no link abaixo:',
        },
        {
          type: 'link',
          line: 4,
          content: 'https://github.com/Galdcvn/igniteFeed'
        }    
      ],
      publishedAt: new Date()
    }            
  ])

  useEffect(() => {
    const post2 = {
      id: 2,
      author: {
        avatarURL: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'John Doe',
        role: 'Back-end Developer'
      },
      content: [
        {
          type: 'paragraph',
          line: 1,
          content: 'Fala galeraa! 👋'
        },
        {
          type: 'paragraph',
          line: 2,
          content: 'Desenvolvi um projeto irado de Cyber Segurnaça. Gostaria de tentar achar vulnerabilidades no sistema? Só clicar no link abaixo.',
        },
        {
          type: 'paragraph',
          line: 3,
          content: 'Feedbacks são sempre bem-vindos!',
        },
        {
          type: 'link',
          line: 4,
          content: 'https://fakegithub.com/johndoe'
        }    
      ],
      publishedAt: new Date()
    }

    const post3 = {
      id: 3,
      author: {
        avatarURL: 'https://images.unsplash.com/photo-1665686304312-16e3a16be0ed?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHdvbWFufGVufDB8fDB8fHww',
        name: 'Jane Doe',
        role: 'Fullstack Developer'
      },
      content: [
        {
          type: 'paragraph',
          line: 1,
          content: 'Oi, gente!'
        },
        {
          type: 'paragraph',
          line: 2,
          content: 'Como estão os projetinhos por ai?',
        },
        {
          type: 'paragraph',
          line: 3,
          content: 'Aqui continamos naquela mega integração. Está ficando lindo:',
        },
        {
          type: 'link',
          line: 4,
          content: 'https://fakegithub.com/janedoe'
        } 
      ],
      publishedAt: new Date()
    }

    const timer1 = setTimeout(() => {
      setPosts((prevPost) => [...prevPost, post2])
    }, 5000)

    const timer2 = setTimeout(() => {
      setPosts((prevPost) => [...prevPost, post3])
    }, 10000)


    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    }
  }, [])

  return (
    <div>
      <Header />
      
      <div className={styles.wrapper}>        
        <Sidebar loggedUser={loggedUserInfo} />
        
        <main>
          {posts.map(post => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
              loggedUser={loggedUserInfo}
            />
          ))}
        </main>

      </div>
    </div>
  )
}