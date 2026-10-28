+++
title = "How Merdra Handles Access to Medical Information"
date = 2026-10-20
description = "How Merdra combines patient permission, role-based authorisation, and audit trails to make medical information portable without making it open."
[taxonomies]
categories = ["Merdra"]
tags = ["merdra", "healthcare"]
+++

Medical information should follow a patient. That does not mean it should be open to every hospital, clinician, or application.

Medical records are confidential. A doctor, nurse, pharmacist, and physiotherapist may care for the same person, but they do not need the same access or have the same responsibilities. Access should depend on who is asking, why they are asking, what they need, and for how long.

Merdra is not a mirror of every hospital’s EMR. It is a trust and exchange layer for the parts of a medical history that need to move safely between care settings.

## How access is decided

Patient permission is an important part of access, but it is not the only check.

Before Merdra returns a record, it should verify the:

- **Practitioner** and **organisation** making the request
- **Role** and **purpose** behind it
- **Requested scope** and **time limit**
- **Applicable policy**

Working at a hospital, or knowing a patient’s name, should not be enough to access their medical information.

## What a patient can do

A patient should be able to:

- **See a patient-safe view of their Merdra history** — what information Merdra holds, where it came from, when it was created, and whether it is current or corrected.
- **Choose who can retrieve relevant records** — for example, approving a new hospital’s request for laboratory history for a defined purpose and period.
- **Revoke a sharing grant** when it is no longer needed.
- **See access history** — which organisation accessed which category of record and when.
- **Request a correction** or add a patient statement when information appears wrong.

This does not mean a patient sees every raw internal hospital note or every result without context. Some information may require clinician discussion or be restricted under a defined safety and legal policy before appearing in the patient-facing view.

Patients cannot edit a diagnosis, prescription, or laboratory result. The organisation and professional who created a record remain accountable for it. A correction creates a new linked version while preserving the source and history.

## What a treating provider can do

When a patient begins care at another hospital, an authorised provider can:

- **Request only what is needed** for care.
- **State the purpose and duration** of that request.
- **Retrieve a permitted, verified, source-attributed copy** of the record.
- **Create new clinical information** under their own organisation’s identity.

They cannot edit the original result, diagnosis, or note created elsewhere.

If Hospital B creates a new test result, diagnosis, or treatment record, that becomes Hospital B’s own clinical assertion. Merdra can add a structured and verifiable representation of it to the patient’s portable history.

## What happens in an emergency?

There are situations where a patient may be unconscious or unable to approve access.

Merdra should eventually support a tightly controlled emergency-access path for verified clinicians. It should:

- Expose only the information necessary for urgent care
- Require a stated reason
- Expire quickly
- Create a full audit trail
- Notify the patient afterwards, where appropriate

Emergency access must be a governed exception, not a back door into every patient record.

## The principle

Hospitals keep using their local systems for appointments, billing, prescriptions, notes, and day-to-day care. Merdra does not replace or run those workflows. It handles the data layer:

- Identity
- Consent
- Provenance
- Permissions
- Audit history
- Safe exchange of selected medical information between authorised systems

> Medical information should follow the patient without becoming a document that anyone can edit.