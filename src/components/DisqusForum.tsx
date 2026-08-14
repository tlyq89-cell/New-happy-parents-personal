import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, Sparkles, Filter, CheckCircle2, UserCircle2 } from 'lucide-react';

interface ForumPost {
  id: string;
  author: string;
  role: string;
  category: string;
  title: string;
  content: string;
  timeAgo: string;
  likes: number;
  replies: {
    id: string;
    author: string;
    content: string;
    timeAgo: string;
  }[];
}

const initialPosts: ForumPost[] = [
  {
    id: 'post_1',
    author: 'Sarah Chen (Mum of 2)',
    role: 'Verified Parent',
    category: 'Coding & Robotics',
    title: 'Is 7 years old too young for Python or should we start with Lego Robotics?',
    content:
      'Thinking of getting my 7-year-old started on STEM. CodeKids Robotics Academy offers both Scratch/Lego and Python labs. Any parents tried both for early primary kids?',
    timeAgo: '3 hours ago',
    likes: 14,
    replies: [
      {
        id: 'rep_1_1',
        author: 'Dr. Alvin Lim (Instructor)',
        content:
          'For 7-year-olds, Lego Mindstorms is fantastic for understanding mechanics and sequential logic visually before transitioning to textual Python!',
        timeAgo: '2 hours ago',
      },
      {
        id: 'rep_1_2',
        author: 'Marcus Tan (Dad of Maya, 8)',
        content:
          'We started with Lego Mindstorms and our daughter was able to build a robotic rover on day 1. High recommend doing trial slots with credits first!',
        timeAgo: '1 hour ago',
      },
    ],
  },
  {
    id: 'post_2',
    author: 'Elena Yeo',
    role: 'Verified Parent',
    category: 'Speech & Drama',
    title: 'StageCraft Drama Institute feedback for shy introverted children?',
    content:
      'My 6-year-old daughter is quite soft-spoken. Wondering if Coach Sarah’s musical theatre and public speaking classes helped other shy kids build confidence?',
    timeAgo: '1 day ago',
    likes: 9,
    replies: [
      {
        id: 'rep_2_1',
        author: 'Priya Sharma (Parent Pro)',
        content:
          'Coach Sarah is extremely warm and gentle. There is zero pressure; they start with fun animal improv games and puppet speaking.',
        timeAgo: '18 hours ago',
      },
    ],
  },
  {
    id: 'post_3',
    author: 'David Wong',
    role: 'Verified Parent',
    category: 'Art & Pottery',
    title: 'Clay & Craft pottery class - do they fire and glaze the pieces for take-home?',
    content:
      'Just booked our first pottery wheel workshop at TripleOne Somerset. Does the 9 credit fee include kiln firing and delivery/pickup of the ceramic piece?',
    timeAgo: '2 days ago',
    likes: 12,
    replies: [
      {
        id: 'rep_3_1',
        author: 'Clay & Craft Studio Team',
        content:
          'Yes! Kiln firing and food-safe glazing are 100% included. Your finished piece is ready for collection in 10-14 days.',
        timeAgo: '1 day ago',
      },
    ],
  },
];

export const DisqusForum: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Coding & Robotics');
  const [newContent, setNewContent] = useState('');
  const [authorName, setAuthorName] = useState('Alex Johnson');
  const [replyInputMap, setReplyInputMap] = useState<Record<string, string>>({});
  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const topics = ['All', 'Coding & Robotics', 'Speech & Drama', 'Art & Pottery', 'Sports & Dance'];

  const filteredPosts = posts.filter((p) => selectedTopic === 'All' || p.category === selectedTopic);

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const isLiked = !prev[postId];
      setPosts((pList) =>
        pList.map((p) => (p.id === postId ? { ...p, likes: p.likes + (isLiked ? 1 : -1) } : p))
      );
      return { ...prev, [postId]: isLiked };
    });
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: ForumPost = {
      id: `post_${Date.now()}`,
      author: authorName.trim() || 'Happy Parent',
      role: 'Verified Parent',
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      timeAgo: 'Just now',
      likes: 1,
      replies: [],
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setIsCreating(false);
  };

  const handleAddReply = (postId: string) => {
    const text = replyInputMap[postId];
    if (!text || !text.trim()) return;

    setPosts((pList) =>
      pList.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          replies: [
            ...p.replies,
            {
              id: `rep_${Date.now()}`,
              author: 'Alex Johnson',
              content: text.trim(),
              timeAgo: 'Just now',
            },
          ],
        };
      })
    );

    setReplyInputMap((prev) => ({ ...prev, [postId]: '' }));
    setActiveReplyPostId(null);
  };

  return (
    <section className="bg-white rounded-2xl p-5 sm:p-7 border border-[#c3c5d9]/30 shadow-xs space-y-6 mt-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c3c5d9]/30 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-[#E8F1FF] text-[#0042c8] rounded-lg">
              <MessageSquare className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-extrabold text-[#191c1e] tracking-tight">
              Parent Community & Reviews Forum
            </h3>
          </div>
          <p className="text-xs text-[#434656]">
            Connect with Singapore parents, ask curriculum questions, and share enrichment experiences.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="bg-[#0042c8] text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-[#003ab2] transition-all flex items-center gap-1.5 shadow-xs shrink-0 active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {isCreating ? 'Close Form' : 'Ask Question / Share Tip'}
        </button>
      </div>

      {/* Topic Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
        <Filter className="w-3.5 h-3.5 text-[#434656] shrink-0 mr-1" />
        {topics.map((top) => (
          <button
            key={top}
            onClick={() => setSelectedTopic(top)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTopic === top
                ? 'bg-[#0042c8] text-white shadow-xs font-bold'
                : 'bg-[#f3f4f6] text-[#434656] hover:bg-[#e7e8ea]'
            }`}
          >
            {top}
          </button>
        ))}
      </div>

      {/* New Post Form */}
      {isCreating && (
        <form
          onSubmit={handleCreatePost}
          className="bg-[#f8f9fb] rounded-2xl p-5 border-2 border-[#0042c8]/30 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200"
        >
          <h4 className="text-sm font-extrabold text-[#191c1e]">Post a New Question or Review</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#191c1e]">Topic Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-white text-xs font-semibold p-2.5 rounded-xl border border-[#c3c5d9]/40 outline-hidden focus:ring-2 focus:ring-[#0042c8]"
              >
                <option value="Coding & Robotics">Coding & Robotics</option>
                <option value="Speech & Drama">Speech & Drama</option>
                <option value="Art & Pottery">Art & Pottery</option>
                <option value="Sports & Dance">Sports & Dance</option>
                <option value="General Advice">General Advice</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#191c1e]">Your Display Name</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Alex Johnson (Mum of Leo)"
                className="w-full bg-white text-xs font-medium p-2.5 rounded-xl border border-[#c3c5d9]/40 outline-hidden focus:ring-2 focus:ring-[#0042c8]"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#191c1e]">Question / Discussion Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Best weekend morning coding workshops for 8yo?"
              className="w-full bg-white text-xs font-medium p-2.5 rounded-xl border border-[#c3c5d9]/40 outline-hidden focus:ring-2 focus:ring-[#0042c8]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#191c1e]">Details & Context</label>
            <textarea
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Share details about class goals, age, experience level..."
              className="w-full bg-white text-xs font-medium p-3 rounded-xl border border-[#c3c5d9]/40 outline-hidden focus:ring-2 focus:ring-[#0042c8] resize-none"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 text-xs font-semibold text-[#434656] hover:bg-[#e7e8ea] rounded-full transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#0042c8] text-white text-xs font-bold px-6 py-2 rounded-full hover:bg-[#003ab2] shadow-sm transition-all"
            >
              Publish Post
            </button>
          </div>
        </form>
      )}

      {/* Discussion Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const isLiked = likedPosts[post.id];
          return (
            <div
              key={post.id}
              className="bg-[#f8f9fb] rounded-2xl p-4 sm:p-5 border border-[#c3c5d9]/30 space-y-3 hover:border-[#0042c8]/30 transition-colors shadow-2xs"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#0042c8]/10 text-[#0042c8] font-bold text-xs flex items-center justify-center">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#191c1e]">{post.author}</span>
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                        {post.role}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#434656]">{post.timeAgo}</span>
                  </div>
                </div>

                <span className="bg-[#E8F1FF] text-[#0042c8] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#0042c8]/20">
                  {post.category}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#191c1e] mb-1">{post.title}</h4>
                <p className="text-xs text-[#434656] leading-relaxed">{post.content}</p>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-1 border-t border-[#c3c5d9]/20 text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                      isLiked ? 'bg-[#0042c8] text-white shadow-2xs' : 'text-[#434656] hover:bg-white'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    onClick={() =>
                      setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id)
                    }
                    className="flex items-center gap-1 text-[#434656] hover:text-[#0042c8] font-semibold px-2 py-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.replies.length} Replies</span>
                  </button>
                </div>

                <button
                  onClick={() =>
                    setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id)
                  }
                  className="text-xs font-bold text-[#0042c8] hover:underline"
                >
                  {activeReplyPostId === post.id ? 'Cancel Reply' : 'Reply'}
                </button>
              </div>

              {/* Replies Thread */}
              {post.replies.length > 0 && (
                <div className="space-y-2 pt-2 pl-4 border-l-2 border-[#0042c8]/30">
                  {post.replies.map((reply) => (
                    <div key={reply.id} className="bg-white rounded-xl p-3 border border-[#c3c5d9]/30 text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#191c1e] flex items-center gap-1">
                          <UserCircle2 className="w-3.5 h-3.5 text-[#0042c8]" />
                          {reply.author}
                        </span>
                        <span className="text-[10px] text-[#434656]">{reply.timeAgo}</span>
                      </div>
                      <p className="text-[#434656] leading-relaxed">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Input Box */}
              {activeReplyPostId === post.id && (
                <div className="pt-2 flex gap-2">
                  <input
                    type="text"
                    value={replyInputMap[post.id] || ''}
                    onChange={(e) =>
                      setReplyInputMap({ ...replyInputMap, [post.id]: e.target.value })
                    }
                    placeholder="Write a helpful reply for fellow parents..."
                    className="flex-1 bg-white text-xs p-2.5 rounded-xl border border-[#c3c5d9]/40 outline-hidden focus:ring-1 focus:ring-[#0042c8]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddReply(post.id);
                      }
                    }}
                  />
                  <button
                    onClick={() => handleAddReply(post.id)}
                    className="bg-[#0042c8] text-white p-2.5 rounded-xl hover:bg-[#003ab2] transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

