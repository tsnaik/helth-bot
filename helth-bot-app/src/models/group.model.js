export function groupModel(sequelize, Sequelize) {
  const group = sequelize.define("group", {
    group_id: {
      unique: true,
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    all_members_admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });
  return group;
}
