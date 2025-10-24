'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';

const V213 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // Add your login logic here
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-700 to-black">
      {/* Fog overlay */}
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 2, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/40 to-transparent pointer-events-none"
      ></motion.div>

      {/* Boy walking through the fog */}
      <motion.div
        initial={{ x: -150, opacity: 0 }}
        animate={{ x: 'calc(50vw - 50px)', opacity: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute bottom-20 left-0 text-6xl z-20"
      >
        🚶‍♂️
      </motion.div>

      {/* Glowing login form revealed */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 1, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-center min-h-screen"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 4, duration: 1, ease: "easeOut" }}
          className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.3, duration: 0.6 }}
            className="text-3xl font-bold text-center mb-8 text-white"
          >
            Welcome Back
          </motion.h2>
          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 4.5, duration: 0.6 }}
              className="mb-6"
            >
              <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">
                Email Address
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" }}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-indigo-400 transition duration-300"
                placeholder="Enter your email"
                required
              />
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 4.7, duration: 0.6 }}
              className="mb-8"
            >
              <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" }}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-indigo-400 transition duration-300"
                placeholder="Enter your password"
                required
              />
            </motion.div>
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 4.9, duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition duration-300 shadow-lg"
            >
              Log In
            </motion.button>
          </form>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.1, duration: 0.6 }}
            className="mt-6 text-center"
          >
            <a href="#" className="text-white/80 hover:text-white text-sm">
              Forgot your password?
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default V213;
