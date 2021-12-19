import ClinicEmailCommands from '../../command/clinicEmail.js';
import ClinicEmail from '../../model/clinicEmail.js';

const handleImport = async (req) => {
    const request = JSON.parse(req);
    console.log(request);
    const { error } = ClinicEmailCommands.validate(request);
    if (error) {
        return console.log(error);
    }
    try {
        const clinicEmailObj={
            clinicId: request.id,
            email: request.email
        }
        const filter = { "clinicId": clinicEmailObj.clinicId } 
        ClinicEmail.findOneAndUpdate(filter, clinicEmailObj, {
          new: true,
          upsert: true, //Create new, if record doesn't exist.
          rawResult: true
        })
          .then((result) => {
            const action = result.lastErrorObject.updatedExisting ? "updated" : "imported"
            console.log(`Clinic email with clinicId:${result.value.clinicId} successfully ${action}.`);
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(`Import error on id:${request.id}! `, err);
        return;
      }
}

export default {
    handleImport
}