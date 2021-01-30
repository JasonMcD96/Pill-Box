module.exports = function (sequelize, DataTypes) {
    var Patient = sequelize.define("Patient", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        medication: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        timesPD: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        withFood: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        taken: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Patient.associate = function (models) {

        Patient.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Patient;
};