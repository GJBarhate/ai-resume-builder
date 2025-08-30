import React, { useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "@/Services/AiModel";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Textarea } from "../ui/textarea";

const PROMPT = `Create a JSON object with the following fields:
    "position_Title": A string representing the job title.
    "experience": An array of strings, each representing a bullet point describing relevant experience for the given job title in html format.
For the Job Title "{positionTitle}" and considering these keypoints: "{keypoints}", create a JSON object with the following fields:
The experience array should contain 5-7 bullet points. Each bullet point should be a concise description of a relevant skill, responsibility, or achievement based on the keypoints provided.`;

function RichTextEditor({ onRichTextEditorChange, index, resumeInfo }) {
  const [value, setValue] = useState(
    resumeInfo?.experience[index]?.workSummary || ""
  );
  const [loading, setLoading] = useState(false);
  const [keypoints, setKeypoints] = useState("");
  const [showKeypoints, setShowKeypoints] = useState(false);

  useEffect(() => {
    onRichTextEditorChange(value);
  }, [value]);

  const GenerateSummaryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      toast("Please Add Position Title");
      return;
    }
    setLoading(true);

    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    ).replace("{keypoints}", keypoints || "General experience and responsibilities");
    
    try {
      const result = await AIChatSession.sendMessage(prompt);
      console.log(typeof result.response.text());
      console.log(JSON.parse(result.response.text()));
      const resp = JSON.parse(result.response.text());
      await setValue(
        resp.experience
          ? resp.experience?.join("")
          : resp.experience_bullets?.join("")
      );
      setShowKeypoints(false);
      setKeypoints("");
    } catch (error) {
      console.error("AI Generation Error:", error);
      toast("Error generating content from AI");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summery</label>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowKeypoints(!showKeypoints)}
            type="button"
            className="flex gap-2 border-green-500 text-green-600 hover:bg-green-50"
          >
            📝 Add keypoints from your experience
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={GenerateSummaryFromAI}
            disabled={loading}
            className="flex gap-2 border-primary text-primary"
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Generate from AI
              </>
            )}
          </Button>
        </div>
      </div>
      
      {showKeypoints && (
        <div className="mb-4 p-3 border rounded-lg bg-green-50">
          <label className="text-xs font-medium text-green-700 mb-2 block">
            Add keypoints from your experience (optional - helps AI generate better content)
          </label>
          <Textarea
            placeholder="E.g., Led team of 5 developers, Implemented microservices, Reduced load time by 40%, Managed CI/CD pipeline..."
            value={keypoints}
            onChange={(e) => setKeypoints(e.target.value)}
            className="resize-none border-green-200 focus:border-green-400"
            rows={3}
          />
        </div>
      )}
      
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(value);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
