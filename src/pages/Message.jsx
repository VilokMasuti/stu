import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RefreshCwIcon as ReloadIcon, Trash2 } from 'lucide-react'
import useAiStore from '../store/aiStore'

export default function Message() {
  const { messages, loading, error, fetchMessages, sendMessage, clearMessages } = useAiStore()
  const [inputMessage, setInputMessage] = useState('')

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      await sendMessage(inputMessage)
      setInputMessage('')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>AI Study Assistant</CardTitle>
          <Button
            variant="outline"
            size="icon"
            onClick={clearMessages}
            title="Clear chat history"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <ScrollArea className="h-[400px] mb-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Start a conversation by asking a question
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`flex ${message.is_ai ? 'justify-start' : 'justify-end'} mb-4`}>
                  <div className={`flex ${message.is_ai ? 'flex-row' : 'flex-row-reverse'} items-start`}>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={message.is_ai ? "/ai-avatar.png" : "/user-avatar.png"} />
                      <AvatarFallback>{message.is_ai ? 'AI' : 'You'}</AvatarFallback>
                    </Avatar>
                    <div className={`mx-2 p-2 rounded-lg ${message.is_ai ? 'bg-gray-100' : 'bg-blue-100'} max-w-[80%]`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {new Date(message.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-center items-center mt-4">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                AI is thinking...
              </div>
            )}
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              type="text"
              placeholder="Ask a question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Sending
                </>
              ) : (
                'Send'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

