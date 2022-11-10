import styles from '../../../styles/Home.module.css';

const BlogPage = ({post}) => {
    return (
        <div className={styles.container}>
            <p className={styles.title}>{post.title}</p>
            tags:
            <ul>
                {post.tags.map((tag,i)=>(<li key={i}>{tag}</li>))}
            </ul>
            author:
            <p><img src={post.user.profile_image} style={{width:'30px'}}/>
            {post.user.name}</p>
            <div dangerouslySetInnerHTML={{ __html: post.body_html }} />

        </div>
    );
};

export const getStaticProps = async ({params}) => {
    const res = await fetch(`https://dev.to/api/articles/${params.user}/${params.slug}`);
    const post = await res.json()

    return {
        props: {
            post
        },
        revalidate: 30
    };
};

export async function getStaticPaths() {
    const res = await fetch(`https://dev.to/api/articles?username=cherylli`);
    const posts = await res.json()

    return {
        paths: posts.map(post => ({
            params: {
                user: post.path.split('/')[0],
                slug: post.slug
            }
        })),
        fallback: 'blocking',
    };
}

export default BlogPage;