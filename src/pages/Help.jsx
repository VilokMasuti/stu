import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Help = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Help Center</h1>
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find answers to common questions about our platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I reset my password?</AccordionTrigger>
              <AccordionContent>
                To reset your password, go to the login page and click on the "Forgot Password" link. Follow the instructions sent to your email to create a new password.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How can I enroll in a new course?</AccordionTrigger>
              <AccordionContent>
                To enroll in a new course, navigate to the "Courses" section, find the course you're interested in, and click the "Enroll" button. If you have any issues, please contact your administrator.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Where can I view my grades?</AccordionTrigger>
              <AccordionContent>
                You can view your grades in the "My Progress" section of your student dashboard. If you can't find your grades or have questions about them, please reach out to your instructor.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>Can't find what you're looking for? Reach out to our support team.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input placeholder="Your Name" />
            <Input type="email" placeholder="Your Email" />
            <Input placeholder="Subject" />
            <textarea
              className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Describe your issue"
            ></textarea>
            <Button type="submit">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Help