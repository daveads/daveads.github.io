+++
title = "Medical History" 
date = 2026-10-09
description = "What conversations with two doctors reveal about medical history, missing records, and continuity of care."
[taxonomies]
categories = ["Merdra"]
tags = ["merdra", "healthcare"]
+++

When you visit a doctor, the conversation usually begins with what is bothering you now. But understanding your current condition can also mean looking at what happened before.

A previous diagnosis, a medicine you are taking, an operation, or a reaction to treatment may influence the decisions made during that visit. Your medical history gives the doctor context for understanding the person in front of them.

I wanted to understand how this works in everyday practice, so I asked doctors on our team how they use previous patient information and what happens when they cannot access it. This article draws on two of those conversations.

Their responses brought the problem into focus. Sometimes patients can explain their history clearly. Sometimes they cannot. And sometimes the information has already been recorded, but the doctor still has difficulty retrieving it.

One doctor described a consultation that illustrated this last situation.

The patient could not clearly explain an existing diagnosis or name the medicines they were taking. The facility had recently moved to a different electronic medical record system. To understand the patient's treatment and decide what needed to change, the doctor and a consultant had to pause the consultation and retrieve information from the old system.

The information existed. Finding it still interrupted the care being provided.

The clinician still needs to assess the person in front of them. Previous documentation contributes to that assessment alongside the patient's account, examination findings, and relevant investigations.

Both doctors said that when records are unavailable, they take a fresh history. One pointed out that this can be straightforward when the patient can clearly describe their health and treatment. Missing documentation does not make every consultation impossible.

The difficulty becomes more apparent when the person cannot provide that account. The other doctor described an unconscious patient whose relatives did not know about an existing condition. Important parts of the patient's history became clear only during further assessment.

Those experiences made me think about how much we ask patients and families to carry between appointments. Imagine arriving at a new clinic with results on your phone, a prescription on paper, and details of an earlier consultation you are trying to remember.

Someone may know they take a tablet without knowing its name. A relative may accompany a patient without knowing their earlier diagnoses. A record can help fill those gaps, while still needing to be checked against the patient's current situation.

Medication information was another concrete example. One doctor described how reviewing a patient's medication history led the team to postpone a planned operation. I am keeping the clinical details general here, but the significance for this discussion is clear: information about earlier care changed the next decision.

Accurate medication records include current medicines, known allergies and reactions, and changes to treatment. The Care Quality Commission's guidance also emphasises checking discrepancies when people move between care settings.


The conversations also changed how I think about investigations. Not every consultation requires new laboratory tests or access to every past record. What matters is whether the available information helps answer the current clinical question.

Even when an earlier result is available, another test may be needed. The doctors described several different reasons for repeating an investigation:

- **Monitoring:** a new result may be needed to assess changes in the patient's condition or response to treatment.
- **Checking a finding:** a result that raises concerns about reliability or differs substantially from the clinical picture may prompt further investigation.
- **Missing information:** a previous result may have to be repeated because it cannot be retrieved.

Those reasons deserve separate attention. Better access could help address the third situation. It would not remove the need for clinical monitoring or for questioning a result.

A result also needs context. A value outside a reference range does not always indicate illness, and a value within it does not always rule illness out. Interpretation depends on the wider clinical picture.

Earlier results may help reveal changes over time. Dates, units, reference ranges, and testing methods matter when making comparisons. Results from different laboratories may not be directly comparable.

For anyone building software around medical records, those details deserve as much attention as the number itself.

That leads to another question I asked: what makes a doctor trust a result from another facility?

Both doctors discussed the facility's track record and whether the findings made sense alongside the patient's presentation. Their accounts suggest that access and confidence in the information are separate problems to understand.

For Merdra, that distinction matters. Recording where a result came from and whether it has changed can make its history traceable. It does not, by itself, establish that the test was performed correctly or that the interpretation is accurate.

The old-EMR example raises a related engineering question. What happens to a patient's history when an institution changes software? In the case described to me, the clinicians could retrieve it, but doing so required an extra step during the consultation. Making information digital had not made continuity automatic.

Both doctors wanted reliable access to previous records across facilities. My interpretation is that continuity should mean access to relevant information in a form the clinician can assess and use. It needs to be current enough for the decision and available to the people authorised to use it. Patients should not have to surrender privacy to benefit from continuity.

This is part of the problem we are working on at [Merdra](https://www.merdra.com/).

Building towards medical information that can follow a patient across providers and become usable by other healthcare software. Identity, permissions, and the source and history of each record are part of that foundation.

Making information available is one part of the work. Its accuracy, meaning, and place in the clinical workflow matter too.

These conversations give us specific things to investigate as we build:<br>
how clinicians retrieve older records, how they check results from elsewhere, and where information becomes difficult to use. We still need to learn how often these situations occur and whether our approach helps in practice.

<br>
The question I want us to keep asking is simple:<br>
when someone needs care, can the people caring for them access and understand the information that matters?

<!-- Editorial note: Before publication, ask the two doctors to confirm that the anonymised paraphrases reflect their accounts accurately. The medication examples intentionally omit drug names, doses, administration instructions, and recommended waiting periods. -->

<br><br>
{% <note header="Note:"> %}
Paraphrased from responses shared by two doctors on the Merdra team while developing this article. These are exploratory conversations, not a representative study. Patient and facility identifiers are not included.
{% </note> %}
