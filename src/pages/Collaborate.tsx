import React from 'react';
import { ArrowLeft, Users, MessageSquareText, Map, Share2 } from 'lucide-react';

const collaborators = [
  { name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1', status: 'active' },
  { name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2', status: 'idle' },
  { name: 'Charlie', avatar: 'https://i.pravatar.cc/150?img=3', status: 'active' },
];

const messages = [
  { from: 'Alice', text: 'Shall we go to Bakery first?', time: '2 mins ago' },
  { from: 'You', text: 'I’m near the dairy section now.', time: '1 min ago' },
];

const Collaborate = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => (window.location.href = '/map')}
            className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Route
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Collaborate Live
          </h1>
          <button className="flex items-center gap-2 px-5 py-2 bg-blue-500/10 border border-blue-400/30 text-blue-300 rounded-xl hover:bg-blue-500/20">
            <Share2 className="w-4 h-4" />
            Share Link
          </button>
        </div>

        {/* Collaborators & Chat */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Collaborators Panel */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-inner">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-semibold">Collaborators</h2>
            </div>
            <div className="space-y-4">
              {collaborators.map((user, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    className={`w-10 h-10 rounded-full border-2 ${
                      user.status === 'active' ? 'border-green-400' : 'border-white/20'
                    }`}
                    alt={user.name}
                  />
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className={`text-xs ${user.status === 'active' ? 'text-green-400' : 'text-white/40'}`}>
                      {user.status === 'active' ? 'Active' : 'Idle'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Panel */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-inner col-span-2 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquareText className="w-5 h-5 text-yellow-400" />
              <h2 className="text-xl font-semibold">Live Chat</h2>
            </div>
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[300px] pr-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl max-w-sm ${
                    msg.from === 'You'
                      ? 'ml-auto bg-blue-500/10 text-blue-300 border border-blue-400/30'
                      : 'bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <p className="text-sm font-medium mb-1">{msg.from}</p>
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs text-white/40 mt-1">{msg.time}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              />
              <button className="px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-lg hover:bg-blue-500/30">
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Group Progress Tracker */}
        <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-inner">
          <div className="flex items-center gap-3 mb-4">
            <Map className="w-5 h-5 text-pink-400" />
            <h2 className="text-xl font-semibold">Group Progress Tracker</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {collaborators.map((user, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 rounded-full mb-2 border-2 border-white/10"
                />
                <p className="font-medium text-white">{user.name}</p>
                <p className="text-xs text-white/50 mb-2">
                  {user.status === 'active' ? 'Currently shopping' : 'Waiting'}
                </p>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      user.status === 'active' ? 'bg-green-400 w-4/5' : 'bg-yellow-400 w-2/5'
                    } rounded-full transition-all duration-500`}
                  ></div>
                </div>
                <p className="text-xs text-white/40 mt-1">
                  {user.status === 'active' ? '80% done' : '40% done'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborate;
