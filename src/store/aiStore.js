import { create } from 'zustand';
import { getAiResponse } from '../utils/AiService'; // Make sure the correct API function is imported

const useAiStore = create((set, get) => ({
  messages: [],
  loading: false,
  error: null,

  // Fetch stored messages from localStorage
  fetchMessages: () => {
    try {
      const savedMessages = localStorage.getItem('chat_messages');
      if (savedMessages) {
        set({ messages: JSON.parse(savedMessages) });
      }
    } catch (error) {
      console.error('Error fetching messages from localStorage:', error);
      set({ error: 'Failed to load chat history' });
    }
  },

  // Send a new message, either from the user or the AI
  sendMessage: async (content, isAi = false) => {
    try {
      const newMessage = {
        id: Date.now(),
        content,
        is_ai: isAi,
        created_at: new Date().toISOString(),
      };

      // Update the messages state and save to localStorage
      set((state) => {
        const updatedMessages = [...state.messages, newMessage];
        localStorage.setItem('chat_messages', JSON.stringify(updatedMessages));
        return { messages: updatedMessages };
      });

      // If it's a user message, get the AI's response
      if (!isAi) {
        set({ loading: true });

        // Make the API call to fetch AI response
        const aiResponse = await getAiResponse(content);

        // Handle failed AI response
        if (!aiResponse) {
          set({ error: 'Failed to get a response from the AI', loading: false });
          return;
        }

        // Send AI response as a new message
        await get().sendMessage(aiResponse, true);
        set({ loading: false });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      set({ error: 'Failed to send message', loading: false });
    }
  },

  // Clear all messages
  clearMessages: () => {
    localStorage.removeItem('chat_messages');
    set({ messages: [] });
  },
}));

export default useAiStore;
