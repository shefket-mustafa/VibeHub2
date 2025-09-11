import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function FAQ() {
  
    return (
      <section className="max-w-3xl mx-auto py-12 px-4 z-10">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-8">
          Frequently Asked Questions
        </h1>
  
        <Accordion className='bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg'>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">What is VibeHub?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          VibeHub is a social platform where you can connect with others, share posts, like, and comment. It's built with React, Express, and MongoDB.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className='bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg'>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">How do I create an account?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Click on 'Register' in the navigation menu, fill out your username, email, and password, and you’ll be ready to join the community.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className='bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg'>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">I forgot my password, what should I do?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Use the 'Forgot Password' link on the login page. You’ll receive an email with a reset link that expires after 15 minutes.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className='bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg'>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Is my data secure?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes. Passwords are encrypted with bcrypt and authentication uses JWT tokens. We never store your raw password.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className='bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg'>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Can I delete my posts?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes. Any post you create can be deleted at any time from your profile or the feed.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className='bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg'>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">What’s coming next?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          We’re working on adding friends, groups, and memories features. Stay tuned for updates!
          </Typography>
        </AccordionDetails>
      </Accordion>

      </section>
    );
  }
  