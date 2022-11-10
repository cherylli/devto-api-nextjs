import styles from '../styles/Home.module.css'
import Link from 'next/link';

const Home = ({posts}) => {
    return (
        <main className={styles.container}>
            <h1>
                Dev.to Blog
            </h1>
            <p>
                displaying dev.to blog posts using the Dev.to API
            </p>
            <div className={styles.grid}>
                {posts.map((post) => (
                    <BlogPostCard post={post} key={post.id}/>
                ))}
            </div>
        </main>)
}

const BlogPostCard = ({post}) => {
    return(
        <div className={styles.card}>
            <Link href={`posts${post.path}`}>{post.title}</Link>
        </div>
    )
}


export async function getStaticProps(){
    const res = await fetch('https://dev.to/api/articles?username=cherylli')
    const posts = await res.json()

    return{
        props:{
            posts
        },
      }
}

export default Home