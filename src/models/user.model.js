export function userModel(sequelize, Sequelize) {
  const User = sequelize.define("user", {
    user_id: {
      unique: true,
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    is_bot: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    language_code: {
      type: Sequelize.STRING,
    },
  });
  return User;
}
