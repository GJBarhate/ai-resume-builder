import { useState } from "react";
import PropTypes from "prop-types";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AIChatSession } from "@/Services/AiModel";
import { updateThisResume } from "@/Services/resumeAPI";

const promptTemplate = `Job Title: {jobTitle}. 
Give me a list of summaries for 3 experience levels (Fresher, Mid, Senior) in 3-4 lines each. 
Return a JSON array with fields "summary" and "experience_level".`;

function Summary({ resumeInfo, enanbledNext, enanbledPrev }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);
  const { resume_id } = useParams();

  const handleInputChange = (e) => {
    enanbledNext(false);
    enanbledPrev(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
    setSummary(e.target.value);
  };

  const onSave = async (e) => {
    e.preventDefault();
    if (!resume_id) return;
    setLoading(true);
    try {
      await updateThisResume(resume_id, { data: { summary } });
      toast("Resume Updated", "success");
    } catch (error) {
      toast("Error updating resume", error.message);
    } finally {
      enanbledNext(true);
      enanbledPrev(true);
      setLoading(false);
    }
  };

  const setSummaryValue = (newSummary) => {
    dispatch(
      addResumeData({
        ...resumeInfo,
        summary: newSummary,
      })
    );
    setSummary(newSummary);
  };

  const GenerateSummaryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast("Please add a Job Title");
      return;
    }

    setLoading(true);
    const PROMPT = promptTemplate.replace("{jobTitle}", resumeInfo.jobTitle);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const rawText = result.response.text();
      console.log("AI Raw Response:", rawText);

      // Clean and parse JSON safely
      const cleaned = rawText.replace(/\n/g, "").trim();
      const aiResponse = JSON.parse(cleaned);
      const summaryList = Array.isArray(aiResponse) ? aiResponse : [aiResponse];

      setAiGeneratedSummaryList(summaryList);
      toast("Summary Generated", "success");
    } catch (error) {
      console.error("AI Parsing Error:", error);
      toast("Error generating summary", error.message);
      setAiGeneratedSummaryList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={GenerateSummaryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Sparkles className="h-4 w-4" /> Generate from AI
            </Button>
          </div>

          <Textarea
            name="summary"
            className="mt-5"
            required
            value={summary}
            onChange={handleInputChange}
          />

          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList.length > 0 && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                enanbledNext(false);
                enanbledPrev(false);
                setSummaryValue(item.summary);
              }}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item.experience_level}
              </h2>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Summary.propTypes = {
  resumeInfo: PropTypes.shape({
    summary: PropTypes.string,
    jobTitle: PropTypes.string,
  }),
  enanbledNext: PropTypes.func.isRequired,
  enanbledPrev: PropTypes.func.isRequired,
};

export default Summary;
