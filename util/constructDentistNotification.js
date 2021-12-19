export default (details, time) => (`
New appointment has been received!
Patient Name: ${details.patientName}
Patient Email: ${details.patientEmail}
Patient Phone: ${details.patientEmail}

Date: ${time.date}
Time: ${time.startAt}-${time.endAt}
Message: ${details.message}

Requestid: ${details.requestId}
`)