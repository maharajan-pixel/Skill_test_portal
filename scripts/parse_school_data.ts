// Raw data parser script to generate typed TypeScript schoolData.ts
import fs from 'fs';
import path from 'path';

const examCsv = `Class_Sec,Subject,Exam_Title,Teacher_Sheet_URL,Teacher_Email,Status,Q_Count,Exam_Mins,Score_Status
VI A,Maths,JUNE MONTH VI MATHS SKILL TEST 23.06.2026,https://docs.google.com/spreadsheets/d/1St-V09cDLDlms9VWK8aReqz8_j-QCziT58eBGBQdOvM/edit?gid=0#gid=0,dharani@spicschool.com,Closed,10,10,RELEASED
VI B,Maths,JUNE MONTH VI MATHS SKILL TEST 23.06.2026,https://docs.google.com/spreadsheets/d/1St-V09cDLDlms9VWK8aReqz8_j-QCziT58eBGBQdOvM/edit?gid=0#gid=0,thayammal@spicschool.com,Closed,10,10,RELEASED
VI C,Maths,JUNE MONTH VI MATHS SKILL TEST 23.06.2026,https://docs.google.com/spreadsheets/d/1St-V09cDLDlms9VWK8aReqz8_j-QCziT58eBGBQdOvM/edit?gid=0#gid=0,priyadharshini@spicschool.com,Closed,10,10,RELEASED
VI A,Science,JUNE MONTH VI - SCIENCE SKILL TEST -25.06.2026,https://docs.google.com/spreadsheets/d/1RXycY-p72hs82PkEdGT9Rvjq9-WCo2XEqD06iW22rTg/edit?gid=0#gid=0,"hepziba@spicschool.com, esakkiammal@spicschool.com",Closed,20,15,
VI B,Science,JUNE MONTH VI - SCIENCE SKILL TEST -25.06.2026,https://docs.google.com/spreadsheets/d/1RXycY-p72hs82PkEdGT9Rvjq9-WCo2XEqD06iW22rTg/edit?gid=0#gid=0,"evangaline@spicschool.com, ramyajuliet@spicschool.com",Closed,20,15,
VI C,Science,JUNE MONTH VI - SCIENCE SKILL TEST -25.06.2026,https://docs.google.com/spreadsheets/d/1RXycY-p72hs82PkEdGT9Rvjq9-WCo2XEqD06iW22rTg/edit?gid=0#gid=0,"heartlin@spicschool.com, ramalalitha@spicschool.com",Closed,20,15,
VII A,Maths,JUNE MONTH VII MATHS SKILL TEST 24.06.2026,https://docs.google.com/spreadsheets/d/1nxGjSglI4nZpyE1zrP04UsAK82R5bR2BPYRsfGc7jCE/edit?gid=0#gid=0,uginimmaculate@spicschool.com,Closed,10,10,
VII B,Maths,JUNE MONTH VII MATHS SKILL TEST 24.06.2026,https://docs.google.com/spreadsheets/d/1nxGjSglI4nZpyE1zrP04UsAK82R5bR2BPYRsfGc7jCE/edit?gid=0#gid=0,muneeswari@spicschool.com,Closed,10,10,
VII C,Maths,JUNE MONTH VII MATHS SKILL TEST 24.06.2026,https://docs.google.com/spreadsheets/d/1nxGjSglI4nZpyE1zrP04UsAK82R5bR2BPYRsfGc7jCE/edit?gid=0#gid=0,ponselvi.c@spicschool.com,Closed,10,10,
VII A,Science,JUNE MONTH VII - SCIENCE SKILL TEST -29.06.2026,https://docs.google.com/spreadsheets/d/14-29_Y4Nwc2r0W8UUBRmOwt0HmUlsMAbGGoIFQoipXs/,"flowerista@spicschool.com, deivanayaki@spicschool.com",Closed,20,15,
VII B,Science,JUNE MONTH VII - SCIENCE SKILL TEST -29.06.2026,https://docs.google.com/spreadsheets/d/14-29_Y4Nwc2r0W8UUBRmOwt0HmUlsMAbGGoIFQoipXs/,"soumiya@spicschool.com, rajeswari.l@spicschool.com",Closed,20,15,
VII C,Science,JUNE MONTH VII - SCIENCE SKILL TEST -29.06.2026,https://docs.google.com/spreadsheets/d/14-29_Y4Nwc2r0W8UUBRmOwt0HmUlsMAbGGoIFQoipXs/,"arun@spicschool.com, cecilynsubha@spicschool.com",Closed,20,15,
VI A,THULIR QUIZ,THULIR QUIZ COMPETITION JUNIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
VI B,THULIR QUIZ,THULIR QUIZ COMPETITION JUNIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
VI C,THULIR QUIZ,THULIR QUIZ COMPETITION JUNIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
VII A,THULIR QUIZ,THULIR QUIZ COMPETITION JUNIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
VII B,THULIR QUIZ,THULIR QUIZ COMPETITION JUNIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
VII C,THULIR QUIZ,THULIR QUIZ COMPETITION JUNIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
VIII A,THULIR QUIZ,THULIR QUIZ COMPETITION JUNIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
VIII B,THULIR QUIZ,THULIR QUIZ COMPETITION JUNIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
VIII C,THULIR QUIZ,THULIR QUIZ COMPETITION JUNIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
IX A,THULIR QUIZ,THULIR QUIZ COMPETITION SENIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/1_1A-Df9iqpNmrbjlPFQSBIbDICun1u9rtJyK_06nu4g/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
IX B,THULIR QUIZ,THULIR QUIZ COMPETITION SENIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/1_1A-Df9iqpNmrbjlPFQSBIbDICun1u9rtJyK_06nu4g/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
IX C,THULIR QUIZ,THULIR QUIZ COMPETITION SENIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/1_1A-Df9iqpNmrbjlPFQSBIbDICun1u9rtJyK_06nu4g/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
X A,THULIR QUIZ,THULIR QUIZ COMPETITION SENIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/1_1A-Df9iqpNmrbjlPFQSBIbDICun1u9rtJyK_06nu4g/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
X B,THULIR QUIZ,THULIR QUIZ COMPETITION SENIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/1_1A-Df9iqpNmrbjlPFQSBIbDICun1u9rtJyK_06nu4g/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
X C,THULIR QUIZ,THULIR QUIZ COMPETITION SENIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/1_1A-Df9iqpNmrbjlPFQSBIbDICun1u9rtJyK_06nu4g/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
X D,THULIR QUIZ,THULIR QUIZ COMPETITION SENIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/1_1A-Df9iqpNmrbjlPFQSBIbDICun1u9rtJyK_06nu4g/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
XI A,THULIR QUIZ,THULIR QUIZ COMPETITION SUPER SENIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/17Inx6IUJoI1hYupGUavIcGRkQ2Fq2slteSzIgPHVUAU/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
XI B,THULIR QUIZ,THULIR QUIZ COMPETITION SUPER SENIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/17Inx6IUJoI1hYupGUavIcGRkQ2Fq2slteSzIgPHVUAU/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
XI C,THULIR QUIZ,THULIR QUIZ COMPETITION SUPER SENIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/17Inx6IUJoI1hYupGUavIcGRkQ2Fq2slteSzIgPHVUAU/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
XI D,THULIR QUIZ,THULIR QUIZ COMPETITION SUPER SENIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/17Inx6IUJoI1hYupGUavIcGRkQ2Fq2slteSzIgPHVUAU/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
XII A,THULIR QUIZ,THULIR QUIZ COMPETITION SUPER SENIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/17Inx6IUJoI1hYupGUavIcGRkQ2Fq2slteSzIgPHVUAU/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
XII B,THULIR QUIZ,THULIR QUIZ COMPETITION SUPER SENIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/17Inx6IUJoI1hYupGUavIcGRkQ2Fq2slteSzIgPHVUAU/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
XII C,THULIR QUIZ,THULIR QUIZ COMPETITION SUPER SENIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/17Inx6IUJoI1hYupGUavIcGRkQ2Fq2slteSzIgPHVUAU/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
XII D,THULIR QUIZ,THULIR QUIZ COMPETITION SUPER SENIOR - 23.07.2026,https://docs.google.com/spreadsheets/d/17Inx6IUJoI1hYupGUavIcGRkQ2Fq2slteSzIgPHVUAU/,"cecilynsubha@spicschool.com, kalavathy@spicschool.com",Closed,30,30,
VI A,Maths,AUGUST  MONTH VI - MATHS  SKILL TEST -06.08.2026,https://docs.google.com/spreadsheets/d/1zEq-pDUchmr_SbHwGKpgrEj_Rpf8zTBWG_KnDyLUfqw/,dharani@spicschool.com,Closed,10,10,
VI B,Maths,AUGUST  MONTH VI - MATHS  SKILL TEST -06.08.2026,https://docs.google.com/spreadsheets/d/1zEq-pDUchmr_SbHwGKpgrEj_Rpf8zTBWG_KnDyLUfqw/,thayammal@spicschool.com,Closed,10,10,
VI C,Maths,AUGUST  MONTH VI - MATHS  SKILL TEST -06.08.2026,https://docs.google.com/spreadsheets/d/1zEq-pDUchmr_SbHwGKpgrEj_Rpf8zTBWG_KnDyLUfqw/,priyadharshini@spicschool.com,Closed,10,10,
VI A,Science,AUGUST MONTH VI - SCIENCE SKILL TEST -08.08.2026,https://docs.google.com/spreadsheets/d/1zsWl-gzxy1KF6urq11kEXzN_iz2e0kUDXudLPguoIFs/,"hepziba@spicschool.com, esakkiammal@spicschool.com",Closed,20,20,
VI B,Science,AUGUST MONTH VI - SCIENCE SKILL TEST -08.08.2026,https://docs.google.com/spreadsheets/d/1zsWl-gzxy1KF6urq11kEXzN_iz2e0kUDXudLPguoIFs/,"evangaline@spicschool.com, ramyajuliet@spicschool.com",Closed,20,20,
VI C,Science,AUGUST MONTH VI - SCIENCE SKILL TEST -08.08.2026,https://docs.google.com/spreadsheets/d/1zsWl-gzxy1KF6urq11kEXzN_iz2e0kUDXudLPguoIFs/,"heartlin@spicschool.com, ramalalitha@spicschool.com",Closed,20,20,
VII A,Maths,AUGUST  MONTH VII - MATHS  SKILL TEST -17.08.2026,https://docs.google.com/spreadsheets/d/1rqevQb9EERsBm5B914t_PIY7y8lpwONEtErkcZ_GXCo/,uginimmaculate@spicschool.com,Closed,10,10,
VII B,Maths,AUGUST  MONTH VII - MATHS  SKILL TEST -17.08.2026,https://docs.google.com/spreadsheets/d/1rqevQb9EERsBm5B914t_PIY7y8lpwONEtErkcZ_GXCo/,muneeswari@spicschool.com,Closed,10,10,
VII C,Maths,AUGUST  MONTH VII - MATHS  SKILL TEST -17.08.2026,https://docs.google.com/spreadsheets/d/1rqevQb9EERsBm5B914t_PIY7y8lpwONEtErkcZ_GXCo/,ponselvi.c@spicschool.com,Closed,10,10,
VII A,Science,AUGUST MONTH VII - SCIENCE SKILL TEST -21.08.2026,https://docs.google.com/spreadsheets/d/12V1ca9424NX9HfnseAZAWOBUvgrPwoGS1QGdDe4kMK4/,"flowerista@spicschool.com, deivanayaki@spicschool.com",Closed,20,15,
VII B,Science,AUGUST MONTH VII - SCIENCE SKILL TEST -21.08.2026,https://docs.google.com/spreadsheets/d/12V1ca9424NX9HfnseAZAWOBUvgrPwoGS1QGdDe4kMK4/,"soumiya@spicschool.com, rajeswari.l@spicschool.com",Closed,20,15,
VII C,Science,AUGUST MONTH VII - SCIENCE SKILL TEST -21.08.2026,https://docs.google.com/spreadsheets/d/12V1ca9424NX9HfnseAZAWOBUvgrPwoGS1QGdDe4kMK4/,"arun@spicschool.com, cecilynsubha@spicschool.com",Closed,20,15,
IX A,PSG PRELIMINARY EXAM,PSG PRELIMINARY EXAM-28.08.2026,https://docs.google.com/spreadsheets/d/1E4ctubQNhjN8HftfqQ41Rj5CaJIC7wJ0scxdyGZeyrA/,thayammal@spicschool.com,Closed,20,30,
IX B,PSG PRELIMINARY EXAM,PSG PRELIMINARY EXAM-28.08.2026,https://docs.google.com/spreadsheets/d/1E4ctubQNhjN8HftfqQ41Rj5CaJIC7wJ0scxdyGZeyrA/,thayammal@spicschool.com,Closed,20,30,
IX C,PSG PRELIMINARY EXAM,PSG PRELIMINARY EXAM-28.08.2026,https://docs.google.com/spreadsheets/d/1E4ctubQNhjN8HftfqQ41Rj5CaJIC7wJ0scxdyGZeyrA/,thayammal@spicschool.com,Closed,20,30,`;

export { examCsv };
