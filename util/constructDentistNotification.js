export default (details) => (`
New appointment has been received!
Patient Name: ${details.patientName}
Patient Email: ${details.patientEmail}
Patient Phone: ${details.patientEmail}

Time: ${details.startAt}-${details.endAt}
Message: ${details.message}

Requestid: ${details.requestId}
`)