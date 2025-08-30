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
"projectName": A string representing the project
"techStack":A string representing the project tech stack
"projectSummary": An array of strings, each representing a bullet point in html format describing relevant experience for the given project title and tech stack
projectName-"{projectName}"
techStack-"{techStack}"
keypoints-"{keypoints}"
Please generate content based on the project name, tech stack, and keypoints provided.`;

function SimpeRichTextEditor({ index, onRichTextEditorChange, resumeInfo }) {
  const [value, setValue] = useState(
    resumeInfo?.projects[index]?.projectSummary || ""
  );
  const [loading, setLoading] = useState(false);
  const [keypoints, setKeypoints] = useState("");
  const [showKeypoints, setShowKeypoints] = useState(false);

  useEffect(() => {
    onRichTextEditorChange(value);
  }, [value]);

  const GenerateSummaryFromAI = async () => {
    if (
      !resumeInfo?.projects[index]?.projectName ||
      !resumeInfo?.projects[index]?.techStack
    ) {
      toast("Add Project Name and Tech Stack to generate summary");
      return;
    }
    setLoading(true);

    const prompt = PROMPT.replace(
      "{projectName}",
      resumeInfo?.projects[index]?.projectName
    ).replace("{techStack}", resumeInfo?.projects[index]?.techStack)
     .replace("{keypoints}", keypoints || "General project features and achievements");
    
    console.log("Prompt", prompt);
    
    try {
      const result = await AIChatSession.sendMessage(prompt);
      const resp = JSON.parse(result.response.text());
      console.log("Response", resp);
      await setValue(resp.projectSummary?.join(""));
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
            📝 Add keypoints from your project
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
            Add keypoints from your project (optional - helps AI generate better content)
          </label>
          <Textarea
            placeholder="E.g., Built real-time chat, Integrated payment gateway, Increased performance by 50%, Used AWS services, Implemented user authentication..."
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

export default SimpeRichTextEditor;
