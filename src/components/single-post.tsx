export default function PostContent({ post } :any) {
    return (
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary">
              {post.title}
            </h1>
            <p className="mt-4 text-gray-500">
              By {post.author} on {new Date(post.date).toLocaleDateString()}
            </p>
            <div
              className="mt-6 prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </section>
    );
  }