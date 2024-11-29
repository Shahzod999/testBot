interface AddCommentProps {
  openActions: boolean;
  toggleActions: () => void;
}

const UserApps = ({ openActions, toggleActions }: AddCommentProps) => {
  return (
    <div className={`userActions ${openActions ? "userActions--active" : "userActions--deActive"}`}>
      <div>-</div>
      <h2>Мобильное приложение заведении</h2>
    </div>
  );
};

export default UserApps;
