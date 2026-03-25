import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t } = useTranslation();

  return (
    <section className="center-max py-12 px-4 z-10">
      <h1 className="text-3xl font-bold text-center brand mb-8">
        {t("faq.title")}
      </h1>

      <Accordion
        className="bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg hover:border-orange-400/50 transition"
        sx={{
          backgroundColor: "rgba(23, 23, 23, 0.8)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            backgroundColor: "rgba(31, 41, 55, 0.6)",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon sx={{ color: "#f97316" }} />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            "& .MuiAccordionSummary-content": {
              color: "#fff",
              fontWeight: "500",
            },
            "&:hover": {
              backgroundColor: "rgba(31, 41, 55, 0.4)",
            },
          }}
        >
          <Typography component="span">{t("faq.question1")}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ color: "#d1d5db" }}>
          <Typography>{t("faq.answer1")}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg hover:border-orange-400/50 transition"
        sx={{
          backgroundColor: "rgba(23, 23, 23, 0.8)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            backgroundColor: "rgba(31, 41, 55, 0.6)",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon sx={{ color: "#f97316" }} />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{
            "& .MuiAccordionSummary-content": {
              color: "#fff",
              fontWeight: "500",
            },
            "&:hover": {
              backgroundColor: "rgba(31, 41, 55, 0.4)",
            },
          }}
        >
          <Typography component="span">{t("faq.question2")}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ color: "#d1d5db" }}>
          <Typography>{t("faq.answer2")}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg hover:border-orange-400/50 transition"
        sx={{
          backgroundColor: "rgba(23, 23, 23, 0.8)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            backgroundColor: "rgba(31, 41, 55, 0.6)",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon sx={{ color: "#f97316" }} />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            "& .MuiAccordionSummary-content": {
              color: "#fff",
              fontWeight: "500",
            },
            "&:hover": {
              backgroundColor: "rgba(31, 41, 55, 0.4)",
            },
          }}
        >
          <Typography component="span">{t("faq.question3")}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ color: "#d1d5db" }}>
          <Typography>{t("faq.answer3")}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg hover:border-orange-400/50 transition"
        sx={{
          backgroundColor: "rgba(23, 23, 23, 0.8)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            backgroundColor: "rgba(31, 41, 55, 0.6)",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon sx={{ color: "#f97316" }} />}
          aria-controls="panel4-content"
          id="panel4-header"
          sx={{
            "& .MuiAccordionSummary-content": {
              color: "#fff",
              fontWeight: "500",
            },
            "&:hover": {
              backgroundColor: "rgba(31, 41, 55, 0.4)",
            },
          }}
        >
          <Typography component="span">{t("faq.question4")}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ color: "#d1d5db" }}>
          <Typography>{t("faq.answer4")}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg hover:border-orange-400/50 transition"
        sx={{
          backgroundColor: "rgba(23, 23, 23, 0.8)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            backgroundColor: "rgba(31, 41, 55, 0.6)",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon sx={{ color: "#f97316" }} />}
          aria-controls="panel5-content"
          id="panel5-header"
          sx={{
            "& .MuiAccordionSummary-content": {
              color: "#fff",
              fontWeight: "500",
            },
            "&:hover": {
              backgroundColor: "rgba(31, 41, 55, 0.4)",
            },
          }}
        >
          <Typography component="span">{t("faq.question5")}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ color: "#d1d5db" }}>
          <Typography>{t("faq.answer5")}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="bg-neutral-900/80 border border-neutral-700 mb-3 shadow-lg hover:border-orange-400/50 transition"
        sx={{
          backgroundColor: "rgba(23, 23, 23, 0.8)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            backgroundColor: "rgba(31, 41, 55, 0.6)",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon sx={{ color: "#f97316" }} />}
          aria-controls="panel6-content"
          id="panel6-header"
          sx={{
            "& .MuiAccordionSummary-content": {
              color: "#fff",
              fontWeight: "500",
            },
            "&:hover": {
              backgroundColor: "rgba(31, 41, 55, 0.4)",
            },
          }}
        >
          <Typography component="span">{t("faq.question6")}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ color: "#d1d5db" }}>
          <Typography>{t("faq.answer6")}</Typography>
        </AccordionDetails>
      </Accordion>
    </section>
  );
}
