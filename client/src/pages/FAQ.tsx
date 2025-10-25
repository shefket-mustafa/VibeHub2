import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
  const {t} = useTranslation();

    return (
      <section className="max-w-3xl mx-auto py-12 px-4 z-10">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-8">
          {t("faq.title")}
        </h1>
  
        <Accordion className='bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg'>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">{t("faq.question1")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {t("faq.answer1")}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className='bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg'>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">{t("faq.question2")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {t("faq.answer2")}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className='bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg'>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">{t("faq.question3")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {t("faq.answer3")}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className='bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg'>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">{t("faq.question4")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {t("faq.answer4")}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className='bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg'>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">{t("faq.question5")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {t("faq.answer5")}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className='bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg'>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">{t("faq.question6")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {t("faq.answer6")}
          </Typography>
        </AccordionDetails>
      </Accordion>

      </section>
    );
  }
  