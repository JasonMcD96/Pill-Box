module.exports = function (sequelize, DataTypes) {
    var Meds = sequelize.define("Meds", {
        med_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        dosage: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        timesPD: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        withFood: {
            type: DataTypes.STRING,
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

    Meds.associate = function (models) {

        Meds.belongsTo(models.Patient, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Meds;
}