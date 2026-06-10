import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  ThumbsUp,
  Calendar,
  Clock,
  Eye
} from 'lucide-react';
import { blogPosts } from '../data/blog-posts';
import { BlogAuthor } from '../components/blog/BlogAuthor';
import { Button } from '../components/Button';

export function BlogDetailPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const post = blogPosts.find(post => post.id === blogId);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Blog post not found</h1>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const sharePost = (platform: string) => {
    // In a real app, implement sharing functionality
    alert(`Sharing to ${platform}`);
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="secondary"
            className="mb-8"
            onClick={() => navigate('/blog')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>

          <h1 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
            {post.title}
          </h1>

          <div className="mb-8 flex flex-wrap items-center gap-6">
            <BlogAuthor
              author={post.author}
              authorRole={post.authorRole}
              authorAvatar={post.authorAvatar}
              date={post.date}
            />
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {post.views} views
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mb-8 aspect-video overflow-hidden rounded-xl"
          >
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <div className="sticky top-20 z-10 -mx-4 mb-8 backdrop-blur-md">
            <div className="flex items-center justify-between border-y border-gray-800 bg-black/50 px-4 py-3">
              <div className="flex items-center gap-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setLikes(prev => prev + 1)}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {likes}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark
                    className={`mr-2 h-4 w-4 ${isBookmarked ? 'fill-green-500' : ''}`}
                  />
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
              </div>
              <div className="relative">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowShareMenu(!showShareMenu)}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <AnimatePresence>
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-gray-800 p-2 shadow-lg"
                    >
                      {['Twitter', 'Facebook', 'LinkedIn', 'Copy Link'].map((platform) => (
                        <button
                          key={platform}
                          onClick={() => sharePost(platform)}
                          className="block w-full rounded-lg px-4 py-2 text-left hover:bg-gray-700"
                        >
                          {platform}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="prose prose-invert max-w-none"
          >
            {post.content.split('\n\n').map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="mb-4 text-lg leading-relaxed text-gray-300"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <h3 className="mb-4 text-lg font-bold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <h3 className="mb-6 text-2xl font-bold">Related Posts</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {blogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <motion.div
                    key={relatedPost.id}
                    whileHover={{ y: -8 }}
                    className="group cursor-pointer rounded-xl bg-gray-800 p-4"
                    onClick={() => navigate(`/blog/${relatedPost.id}`)}
                  >
                    <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <h4 className="mb-2 font-bold group-hover:text-green-500">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-gray-400">{relatedPost.excerpt}</p>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      </article>
    </div>
  );
}