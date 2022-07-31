export function attendanceModel(sequelize, Sequelize) {
  const attendance = sequelize.define("attendance", {
    message_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    group_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "groups",
        key: "id",
      },
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
  return attendance;
}
