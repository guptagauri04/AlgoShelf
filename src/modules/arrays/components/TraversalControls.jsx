import {
  Shuffle,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

function Button({
  children,
  icon: Icon,
  onClick,
  variant = "primary",
  disabled = false,
}) {
  const styles = {
    primary:
      "bg-[#1F1B18] border border-[#1F1B18] text-white hover:bg-[#2A2521] hover:-translate-y-0.5 hover:shadow-lg",

    outline:
      "bg-white border border-[#DDD2C6] text-[#1F1B18] hover:bg-[#FCFAF7] hover:border-[#A1764E] hover:-translate-y-0.5 hover:shadow-md",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        min-w-[125px]
        h-11
        rounded-xl
        px-5
        text-[15px]
        font-medium
        transition-all
        duration-200
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:translate-y-0
        disabled:hover:shadow-none
        ${styles[variant]}
      `}
    >
      {Icon && <Icon size={18} strokeWidth={2} />}
      <span>{children}</span>
    </button>
  );
}

export default function TraversalControls({
  onShuffle,
  onPlay,
  onPause,
  onReset,
  playing,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button
        icon={Shuffle}
        onClick={onShuffle}
        variant="outline"
        disabled={playing}
      >
        Shuffle
      </Button>

      <Button
        icon={Play}
        onClick={onPlay}
        variant="primary"
      >
        Play
      </Button>

      <Button
        icon={Pause}
        onClick={onPause}
        variant="outline"
      >
        Pause
      </Button>

      <Button
        icon={RotateCcw}
        onClick={onReset}
        variant="outline"
        disabled={playing}
      >
        Reset
      </Button>
    </div>
  );
}
