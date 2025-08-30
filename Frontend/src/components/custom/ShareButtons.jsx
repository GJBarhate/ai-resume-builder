import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  MessageCircle, 
  Linkedin, 
  Github, 
  Twitter, 
  Facebook, 
  Mail, 
  Copy,
  Share,
  Send,
  MessageSquare
} from 'lucide-react';

const ShareButtons = ({ resumeId, resumeTitle = "My Professional Resume" }) => {
  const shareUrl = `${window.location.origin}/dashboard/view-resume/${resumeId}`;
  const shareText = "Check out my professional resume!";

  // Individual platform share functions
  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
    window.open(whatsappUrl, '_blank');
    toast.success("Opening WhatsApp...");
  };

  const shareToLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedinUrl, '_blank');
    toast.success("Opening LinkedIn...");
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
    toast.success("Opening Twitter...");
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank');
    toast.success("Opening Facebook...");
  };

  const shareToGitHub = () => {
    // For GitHub, we'll open a new issue or gist creation page with the resume link
    const githubUrl = `https://github.com`;
    window.open(githubUrl, '_blank');
    // Copy the link for easy pasting
    copyToClipboard();
    toast.success("Opening GitHub... Link copied for easy sharing!");
  };

  const shareToTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(telegramUrl, '_blank');
    toast.success("Opening Telegram...");
  };

  const shareToDiscord = () => {
    // Discord doesn't have a direct share URL, so we copy the message for easy pasting
    const discordMessage = `${shareText} ${shareUrl}`;
    copyToClipboard(discordMessage);
    toast.success("Message copied! Paste it in Discord.");
  };

  const shareToReddit = () => {
    const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
    window.open(redditUrl, '_blank');
    toast.success("Opening Reddit...");
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(resumeTitle);
    const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
    toast.success("Opening email client...");
  };

  const copyToClipboard = async (customText = null) => {
    const textToCopy = customText || shareUrl;
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success(customText ? "Message copied to clipboard!" : "Resume link copied to clipboard!");
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Manual fallback
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast.success(customText ? "Message copied to clipboard!" : "Resume link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <Share className="w-5 h-5" />
          Share Your Resume
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Share your resume on social platforms or copy the link
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* WhatsApp */}
        <Button
          onClick={shareToWhatsApp}
          variant="outline"
          className="flex items-center gap-2 text-green-600 border-green-200 hover:bg-green-50"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </Button>

        {/* LinkedIn */}
        <Button
          onClick={shareToLinkedIn}
          variant="outline"
          className="flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </Button>

        {/* Twitter */}
        <Button
          onClick={shareToTwitter}
          variant="outline"
          className="flex items-center gap-2 text-sky-500 border-sky-200 hover:bg-sky-50"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </Button>

        {/* Facebook */}
        <Button
          onClick={shareToFacebook}
          variant="outline"
          className="flex items-center gap-2 text-blue-700 border-blue-200 hover:bg-blue-50"
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </Button>

        {/* Telegram */}
        <Button
          onClick={shareToTelegram}
          variant="outline"
          className="flex items-center gap-2 text-blue-500 border-blue-200 hover:bg-blue-50"
        >
          <Send className="w-4 h-4" />
          Telegram
        </Button>

        {/* GitHub */}
        <Button
          onClick={shareToGitHub}
          variant="outline"
          className="flex items-center gap-2 text-gray-800 border-gray-200 hover:bg-gray-50"
        >
          <Github className="w-4 h-4" />
          GitHub
        </Button>

        {/* Email */}
        <Button
          onClick={shareViaEmail}
          variant="outline"
          className="flex items-center gap-2 text-gray-600 border-gray-200 hover:bg-gray-50"
        >
          <Mail className="w-4 h-4" />
          Email
        </Button>

        {/* Copy Link */}
        <Button
          onClick={() => copyToClipboard()}
          variant="outline"
          className="flex items-center gap-2 text-purple-600 border-purple-200 hover:bg-purple-50"
        >
          <Copy className="w-4 h-4" />
          Copy Link
        </Button>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          Share URL: <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{shareUrl}</span>
        </p>
      </div>
    </div>
  );
};

export default ShareButtons;