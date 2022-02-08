type TriggerProps = {
  onTrigger?: () => void;
}

export const Trigger = ({ onTrigger }: TriggerProps) => {
  return (
    <div className="Trigger">
      <button type="button" onClick={onTrigger} data-cy="trigger-implmentation">Trigger</button>
    </div>
  )
}
