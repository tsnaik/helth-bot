export function groupMemberModel(sequelize, Sequelize) {
  const groupMember = sequelize.define("group_member", {
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
  });
  return groupMember;
}
