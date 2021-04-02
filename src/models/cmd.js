module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            description: String,
            isReady: Boolean,
            location: {
                type: String,
                enum : ['Fontaine_Ecu','Planoise','Battant'],
                default: 'Battant'
            },
        },

        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Cmd = mongoose.model("cmd", schema);
    return Cmd;
};