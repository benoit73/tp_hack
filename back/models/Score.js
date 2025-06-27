module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('Score', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    jury_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id'
      }
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 100
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'scores',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['jury_id', 'team_id']
      }
    ]
  });

  Score.associate = function(models) {
    Score.belongsTo(models.User, { foreignKey: 'jury_id', as: 'jury' });
    Score.belongsTo(models.Team, { foreignKey: 'team_id', as: 'team' });
  };

  return Score;
};